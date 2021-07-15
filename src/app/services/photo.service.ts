import { Injectable } from '@angular/core'
import { Platform } from '@ionic/angular'
import { HttpClient } from '@angular/common/http'
import { DomSanitizer } from '@angular/platform-browser'
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core'

import { Photo } from '../Interfaces/interfaces'
import { ApiNodeJs } from '../../environments/environment'

const { Camera, Filesystem, Storage } = Plugins

@Injectable({
	providedIn: 'root',
})
export class PhotoService {
	public progress = 0
	public porcent = 0
	public showPorcent = false
	public photos: Photo[] = []
	private photosEnviar: Photo[] = []
	private PHOTO_STORAGE = 'photos'
	private platform: Platform
	private APINODEJS = ApiNodeJs

	constructor(platform: Platform, private http: HttpClient, private sanitizer: DomSanitizer) {
		this.platform = platform
		Camera.requestPermissions()
	}

	/**
	 * Cargamos fotos guardadas en Storage
	 */
	public async loadSaved() {
		// Retrieve cached photo array data
		const photos = await Storage.get({ key: this.PHOTO_STORAGE })
		this.photos = JSON.parse(photos.value) || []

		// If running on the web...
		if (!this.platform.is('hybrid')) {
			console.log(`Entro al if...`)

			// Display the photo by reading into base64 format
			for (const photo of this.photos) {
				// Read each saved photo's data from the Filesystem
				const readFile = await Filesystem.readFile({
					path: photo.filepath,
					directory: FilesystemDirectory.Data,
				})
				// Web platform only: Save the photo into the base64 field
				photo.base64 = `data:image/jpeg;base64,${readFile.data}`
			}
		}
	}

	/* Use the device camera to take a photo:
  // https://capacitor.ionicframework.com/docs/apis/camera

  // Store the photo data into permanent file storage:
  // https://capacitor.ionicframework.com/docs/apis/filesystem

  // Store a reference to all photo filepaths using Storage API:
  // https://capacitor.ionicframework.com/docs/apis/storage
  */
	public async addNewToGallery(optionSource) {
		const camSource = optionSource === 'Camera' ? CameraSource.Camera : CameraSource.Prompt
		const cameraOptions = {
			resultType: CameraResultType.Uri, // file-based data; provides best performance
			source: camSource, // automatically take a new photo with the camera
			quality: 100, // highest quality (0 to 100)
		}

		// Take a photo
		const capturedPhoto = await Camera.getPhoto(cameraOptions)

		const savedImageFile = await this.savePicture(capturedPhoto)

		// = this.sanitizer.bypassSecurityTrustResourceUrl(capturedPhoto && capturedPhoto.webPath)

		// Add new photo to Photos array
		this.photos.unshift(savedImageFile)

		// Cache all photo data for future retrieval
		Storage.set({
			key: this.PHOTO_STORAGE,
			value: this.platform.is('hybrid')
				? JSON.stringify(this.photos)
				: JSON.stringify(
						this.photos.map((picture) => {
							// Don't save the base64 representation of the photo data,
							// since it's already saved on the Filesystem
							const photoCopy = { ...picture }
							delete photoCopy.base64

							return photoCopy
						}),
				  ),
		})
	}

	// Save picture to file on device
	private async savePicture(cameraPhoto: CameraPhoto) {
		// Convert photo to base64 format, required by Filesystem API to save
		const base64Data = await this.readAsBase64(cameraPhoto)

		// Write the file to the data directory
		const fileName = new Date().getTime() + '.jpg'
		const savedFile = await Filesystem.writeFile({
			path: fileName,
			data: base64Data,
			directory: FilesystemDirectory.Data,
		})

		if (this.platform.is('hybrid')) {
			// Display the new image by rewriting the 'file://' path to HTTP
			// Details: https://ionicframework.com/docs/building/webview#file-protocol
			return {
				filepath: savedFile.uri,
				webviewPath: Capacitor.convertFileSrc(savedFile.uri),
			}
		} else {
			// Use webPath to display the new image instead of base64 since it's
			// already loaded into memory
			return {
				filepath: fileName,
				webviewPath: cameraPhoto.webPath,
			}
		}
	}

	// Read camera photo into base64 format based on the platform the app is running on
	private async readAsBase64(cameraPhoto: CameraPhoto) {
		// "hybrid" will detect Cordova or Capacitor
		if (this.platform.is('hybrid')) {
			// Read the file into base64 format
			const file = await Filesystem.readFile({
				path: cameraPhoto.path,
			})

			return file.data
		} else {
			// Fetch the photo, read as a blob, then convert to base64 format
			// tslint:disable-next-line: no-non-null-assertion
			const response = await fetch(cameraPhoto.webPath!)
			const blob = await response.blob()

			return (await this.convertBlobToBase64(blob)) as string
		}
	}

	// Delete picture by removing it from reference data and the filesystem
	public async deletePicture(photo: Photo, position: number) {
		// Remove this photo from the Photos reference data array
		this.photos.splice(position, 1)

		// Update photos array cache by overwriting the existing photo array
		Storage.set({
			key: this.PHOTO_STORAGE,
			value: JSON.stringify(this.photos),
		})

		// delete photo file from filesystem
		const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1)
		await Filesystem.deleteFile({
			path: filename,
			directory: FilesystemDirectory.Data,
		})
	}

	// Delete picture by removing it from reference data and the filesystem
	public async deleteAllPicture() {
		// Remove this photo from the Photos reference data array
		this.photos.forEach(async (element) => {
			const filename = element.filepath.substr(element.filepath.lastIndexOf('/') + 1)
			// delete photo file from filesystem
			await Filesystem.deleteFile({
				path: filename,
				directory: FilesystemDirectory.Data,
			})
		})

		// Update photos array cache by overwriting the existing photo array

		Storage.remove({
			key: this.PHOTO_STORAGE,
		})

		this.photos = []
	}

	convertBlobToBase64 = (blob: Blob) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onerror = reject
			reader.onload = () => {
				resolve(reader.result)
			}
			reader.readAsDataURL(blob)
		})

	/******************************************************/

	/**
	 * Carga datos del fs y lo envia al backend
	 */
	public async SendBackend(data: any, url: string, validatePicture = false) {
		const formData = new FormData()
		data.validatePicture = validatePicture
		let contador = 0

		const photos = await Storage.get({ key: this.PHOTO_STORAGE })
		this.photosEnviar = JSON.parse(photos.value) || []
		if (this.photosEnviar.length === 0 && validatePicture) {
			throw new Error('ERROR: Debe agregar una foto!!!')
		} else {
			// If running on the web...
			if (!this.platform.is('hybrid')) {
				// Display the photo by reading into base64 format
				console.log(`Entro al if de sendBackend`)
				for (const photo of this.photosEnviar) {
					// Read each saved photo's data from the Filesystem
					const readFile = await Filesystem.readFile({
						path: photo.filepath,
						directory: FilesystemDirectory.Data,
					})
					// Web platform only: Save the photo into the base64 field
					photo.base64 = `data:image/jpeg;base64,${readFile.data}`
					const blob = await fetch(photo.webviewPath).then((res) => res.blob())
					formData.append(`file${contador}`, blob, `file${contador}.jpg`)
					contador++
				}
				formData.append('data', JSON.stringify(data))
				return await this.subirImagenXHR(formData, url)
			} else {
				console.log(`Entro al else SendBackend...`)
				if (this.photosEnviar) {
					for (const photo of this.photosEnviar) {
						// await this.convertToFormDataWebPath(photo, dataUser)
						const blob = await fetch(photo.webviewPath).then((res) => res.blob())
						formData.append(`file${contador}`, blob, `file${contador}.jpg`)
						contador++
					}
					formData.append('data', JSON.stringify(data))
					return await this.subirImagenXHR(formData, url)
				}
			}
		}
	}

	/**
	 * Se envia
	 * @param formData Data a enviar el backend por http
	 */
	// httpPost(formData: FormData) {
	// 	console.log(`Llego a httPost`)
	// 	return this.http.post<any>(`${this.APINODEJS}reportarpagoMobileSqlServer`, formData)
	// }

	// usar XHR para cargar fotos al backend
	async subirImagenXHR(formData: FormData, url: string) {
		// abrir la peticion
		const xhr = new XMLHttpRequest()
		xhr.open('POST', `${this.APINODEJS}${url}`, true)
		// configurar headers con token
		// xhr.setRequestHeader('x-token', this.usuarioService.token)
		// funcion para tomar acciones cuando se complete la peticion
		xhr.onreadystatechange = function () {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status === 200) {
					// implementar aca lo que se desee al completar la peticion
					return 'Registro procesado correctamente'
				} else {
					return 'Error al procesar registro'
				}
			}
		}
		// progreso del upload
		xhr.upload.onprogress = (e) => {
			if (e.lengthComputable) {
				const porcientoSubido = (e.loaded / e.total) * 100
				console.log(Math.trunc(porcientoSubido) + '% Subido')
				this.progress = Math.trunc(porcientoSubido)
				this.porcent = Math.trunc(porcientoSubido)
			}
		}
		// enviar archivo
		xhr.send(formData)
	}
}
