export declare enum CentralState {
    Unknown = "unknown",
    Resetting = "resetting",
    Unsupported = "unsupported",
    Unauthorized = "unauthorized",
    PoweredOff = "poweredOff",
    PoweredOn = "poweredOn"
}
export declare enum AndroidCentralState {
    poweringOff = "poweringOff",
    poweredOff = "poweredOff",
    poweringOn = "poweringOn",
    poweredOn = "poweredOn",
    unknown = "unknown"
}
export declare enum PeripheralState {
    Disconnected = "disconnected",
    Connecting = "connecting",
    Connected = "connected",
    Disconnecting = "disconnecting",
    Unknown = "unknown"
}
export declare enum AndroidAdapterScanMode {
    none = "none",
    connectable = "connectable",
    discoverable = "discoverable"
}
export declare enum AndroidScanMode {
    lowLatency = "lowLatency",
    lowPower = "lowPower",
    balanced = "balanced",
    opportunistic = "opportunistic"
}
export declare type Base64 = string;
export declare type UUID = string;
export declare type Identifier = string;
export declare type TransactionId = string;
export interface NodeInterface {
    id: Identifier;
    uuid: UUID;
}
export interface DescriptorInterface extends NodeInterface {
    characteristicUUID: UUID;
    value?: Base64;
}
export declare type NativeEventData = {
    transactionId?: TransactionId;
    peripheral?: PeripheralInterface | null;
    peripherals?: PeripheralInterface[];
    characteristic?: CharacteristicInterface | null;
    central?: Central | null;
    descriptor?: DescriptorInterface | null;
    service?: ServiceInterface | null;
    advertisementData?: AdvertismentDataInterface | null;
    rssi?: number;
    error?: ErrorInterface | null;
};
export interface ErrorInterface {
    message: string;
    code: string;
    domain?: string | null;
    reason?: string | null;
    suggestion?: string | null;
    underlayingError?: string | null;
}
export interface CharacteristicInterface extends NodeInterface {
    serviceUUID: UUID;
    peripheralUUID: UUID;
    properties: string[];
    descriptors: DescriptorInterface[];
    value: Base64 | null;
    isNotifying: boolean;
    isReadable: boolean;
    isWritableWithResponse: boolean;
    isWritableWithoutResponse: boolean;
    isNotifiable: boolean;
    isIndicatable: boolean;
}
export interface ServiceInterface extends NodeInterface {
    peripheralUUID: UUID;
    isPrimary: boolean;
    includedServices: ServiceInterface[];
    characteristics: CharacteristicInterface[];
}
export interface AdvertismentDataInterface {
    manufacturerData: Base64 | null;
    serviceData: {
        [uuid: string]: Base64;
    } | null;
    serviceUUIDs: Array<UUID> | null;
    localName: string | null;
    txPowerLevel: number | null;
    solicitedServiceUUIDs: Array<UUID> | null;
    isConnectable: boolean | null;
    overflowServiceUUIDs: Array<UUID> | null;
}
export interface PeripheralInterface extends NodeInterface {
    advertisementData?: AdvertismentDataInterface;
    name: string | null;
    rssi: number | null;
    state: PeripheralState;
    canSendWriteWithoutResponse: boolean;
    services: ServiceInterface[];
    discoveryTimestamp?: number;
}
export declare enum TransactionType {
    get = "get",
    rssi = "rssi",
    connect = "connect",
    disconnect = "disconnect",
    scan = "scan"
}
export declare type PeripheralFoundCallback = ((peripheral: PeripheralInterface) => void);
export declare type StateUpdatedCallback = (state: CentralState) => void;
export declare type ScanSettings = {
    serviceUUIDsToQuery?: UUID[];
    scanningOptions?: any;
    callback?: PeripheralFoundCallback;
};
export interface Central {
    state: CentralState;
    isScanning: boolean;
}
export declare type UpdateDescriptorOptions = {
    descriptorUUID?: UUID;
};
export declare type UpdateOptions = {
    peripheralUUID: UUID;
    serviceUUID: UUID;
    characteristicUUID: UUID;
};
export declare type UpdateCharacteristicOptions = UpdateOptions & {
    isEnabled?: boolean;
};
export declare type ReadCharacteristicOptions = UpdateCharacteristicOptions;
export declare type WriteCharacteristicOptions = UpdateCharacteristicOptions & {
    data: Base64;
};
export declare enum CharacteristicProperty {
    Broadcast = "broadcast",
    Read = "read",
    WriteWithoutResponse = "writeWithoutResponse",
    Write = "write",
    Notify = "notify",
    Indicate = "indicate",
    AutheticateSignedWrites = "autheticateSignedWrites",
    ExtendedProperties = "extendedProperties",
    NotifyEncryptionRequired = "notifyEncryptionRequired",
    IndicateEncryptionRequired = "indicateEncryptionRequired"
}
export declare enum Permissions {
    Readable = "Readable",
    Writeable = "Writeable",
    ReadEncryptionRequired = "ReadEncryptionRequired",
    WriteEncryptionRequired = "WriteEncryptionRequired"
}