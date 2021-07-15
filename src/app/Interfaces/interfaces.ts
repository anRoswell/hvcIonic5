export interface IRegisterUser {
	usr_email: string
	usr_password: string
	usr_nameComplete: string
	identificationTypeId: number
	usr_cedula: string
	usr_nroCelular: string
	usr_telefonoFijo?: string
	usr_direccion: string
	usr_terminosCondiciones: boolean
}

export interface ILogin {
	email: string
	password: string
}

export interface ICContratoDet {
	TIPO: string
	CICLCODI: string
	CODIGO_PPAL: string
	createdAt?: Date
	CUENTACONTRATO: string
	DIRENVIO: string
	DIRECCION: string
	ESTRCODI: string
	FRECBARR: string
	FRECRECO: string
	id: number
	NOMBRES: string
	TELEFONO: string
	UNR: string
	updatedAt?: Date
	UR: string
	userId: number
	rancodi?: string
	VOLUBASU: string
	TARIFA?: string
}

export interface Photo {
	filepath: string
	webviewPath: string
	base64?: string
	sanitizer?: any
}

export interface IReportarPago {
	montoPago: string
	fechaPago: Date
	banco: number
	foto: string
	state: number
	userId: number
	cuentaId: number
}

export interface IMenu {
	icon: string
	name: string
	redirectTo: string
}

export interface IBancos {
	id: number
	descripcion: string
	state: boolean
	createdAt: Date
	updatedAt: Date
}

export interface ISolicitarstickers {
	cuentaId: number
	userId: number
	stickeropcionesId: number
	observaciones: string
	state: boolean
}

export interface IPqr {
	opcionespqrId: number
	state: boolean
	descripcion: string
	userId: number
	cuentaId: number
}

export interface EmailVerification {
	usrNames: string
	usrLastNames: string
	usrEmail: string
}

export interface IMessage {
	type: string
	message: string
	item?: number
}

export interface INewContrato {
	fnacimiento: Date
	estadoCivil: number
	direccion: string
	ciudad: number
	beneficiario: IBeneficiario[]
	sign: string
	tyc: boolean
	userId: number
	groupId: number
	groupName: string
	servicioId: number
}

export interface IBeneficiario {
	parentesco: string
	nombreCompleto: string
	edad: number
}

export interface ISliders {
	title: string
	mensaje: string
	imageUrl: string
}

export interface IParametros {
	servicioId: string
	serviceName: string
	groupId: string
}

export interface IDocuments {
	id: number
	name: string
	title: string
	icon?: string
	color?: string
	estado: boolean
	update: boolean
	serviciosSolicitadosDocumentosId: number
	description?: string
	nameFormData: string
	obligatorio: boolean
	permiteVarios: boolean
}

export interface IDataToSend {
	servicioId: string
	groupId: number
	userId: number
	observaciones: string
	dataDocs: IInfoDocs[]
}

export interface IInfoDocs {
	id: number
	name: string
}

export interface IServicioSolicitadoConsulta {
	description: string
	documentsName: string
	documentsUrl: string
	id: number
	title: string
	titleDocumento: string
	serviciosSolicitadosEstado: number
}

export interface IListadoServicios {
	Adquirido: number
	description: string
	id: number
	title: string
}
