import React from 'react';
import { ScrollView, View, Text, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import HeadingText from '../components/HeadingText';
import MonoText from '../components/MonoText';
import { DeviceType } from 'expo-device/build/Device.types';

interface DeviceConstantName {
  name?: string;
  value?: any;
}

interface mState {
  allFeatures?: string;
  maxMemory?: number;
  isSideLoadingEnabled?: string;
  uptime?: number;
  isRooted?: string;
  deviceType?: DeviceType;
}

interface props {}

class DeviceConstants extends React.Component<DeviceConstantName> {
  render() {
    let { name, value } = this.props;
    if (typeof value === 'boolean') {
      return (
        <View style={{ marginBottom: 10 }}>
          <HeadingText>{name}</HeadingText>
          <MonoText> {String(value)}</MonoText>
        </View>
      );
    } else {
      return (
        <View style={{ marginBottom: 10 }}>
          <HeadingText>{name}</HeadingText>
          <MonoText> {value}</MonoText>
        </View>
      );
    }
  }
}

export default class DeviceScreen extends React.PureComponent<props, mState> {
  static navigationOptions = {
    title: 'Device',
  };

  constructor(props: Readonly<props>) {
    super(props);
    this.state = {
      allFeatures: '',
      maxMemory: 0,
      uptime: 0,
      isSideLoadingEnabled: '',
      isRooted: '',
    };
  }

  _getAllFeatures = () => {
    Device.getPlatformFeaturesAsync().then(allFeatures => {
      let result = '';
      allFeatures.forEach(feature => {
        result += feature;
        result += '\n';
      });
      this.setState({ allFeatures: result });
    });
  };
  _getMaxMemory = () => {
    Device.getMaxMemoryAsync().then(maxMemory => {
      this.setState({ maxMemory: maxMemory });
    });
  };
  _getUptime = () => {
    Device.getUptimeAsync().then(uptime => {
      this.setState({ uptime: uptime });
    });
  };
  _isRooted = () => {
    Device.isRootedExperimentalAsync().then(isRooted => {
      this.setState({ isRooted: isRooted.toString() });
    });
  };
  _isSideLoadingEnabled = () => {
    Device.isSideLoadingEnabled().then(isSideLoadingEnabled => {
      this.setState({ isSideLoadingEnabled: isSideLoadingEnabled.toString() });
    });
  };
  _getDeviceType = () => {
    Device.getDeviceTypeAsync().then(deviceType => {
      this.setState({deviceType: deviceType});
    })
  };

  render() {
    return (
      <ScrollView style={{ padding: 20, flex: 1, margin: 10 }}>
        <DeviceConstants name="Device Brand" value={Device.brand}></DeviceConstants>
        <DeviceConstants name="Device manufacturer" value={Device.manufacturer}></DeviceConstants>
        <DeviceConstants name="Device modelName" value={Device.modelName}></DeviceConstants>
        <DeviceConstants name="Device os name" value={Device.osName}></DeviceConstants>
        <DeviceConstants name="Device total Memory" value={Device.totalMemory}></DeviceConstants>
        <DeviceConstants
          name="Device osBuildFingerprint"
          value={Device.osBuildFingerprint}></DeviceConstants>
        <DeviceConstants name="Device isDevice" value={Device.isDevice}></DeviceConstants>
        <DeviceConstants name="Device modelId" value={Device.modelId}></DeviceConstants>
        <DeviceConstants
          name="Device supportedCpuArchitectures"
          value={Device.supportedCpuArchitectures}></DeviceConstants>
        <DeviceConstants name="Device designName" value={Device.designName}></DeviceConstants>
        <DeviceConstants name="Device osBuildId" value={Device.osBuildId}></DeviceConstants>
        <DeviceConstants name="Device productName" value={Device.productName}></DeviceConstants>
        <DeviceConstants
          name="Device platformApiLevel"
          value={Device.platformApiLevel}></DeviceConstants>
        <DeviceConstants name="Device osVersion" value={Device.osVersion}></DeviceConstants>
        <DeviceConstants name="Device deviceName" value={Device.deviceName}></DeviceConstants>
        <DeviceConstants
          name="Device osInternalBuildId"
          value={Device.osInternalBuildId}></DeviceConstants>
        {/* <View style={{ padding: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <HeadingText>getDeviceType</HeadingText>
            <MonoText> {this.state.deviceType}</MonoText>
          </View>
          <Button onPress={this._getDeviceType} title="getDeviceType" color="#DCA42D" />
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <HeadingText>getPlatformFeatures</HeadingText>
            <MonoText> {this.state.allFeatures}</MonoText>
          </View>
          <Button onPress={this._getAllFeatures} title="getPlatformFeatures" color="#DCA42D" />
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <HeadingText>get max memory</HeadingText>
            <MonoText> {this.state.maxMemory}</MonoText>
          </View>
          <Button onPress={this._getMaxMemory} title="getMaxMemory" color="#DCA42D" />
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <HeadingText>isSideLoadingEnabled</HeadingText>
            <MonoText> {this.state.isSideLoadingEnabled}</MonoText>
          </View>
          <Button
            onPress={this._isSideLoadingEnabled}
            title="getIsSideLoadingEnabled"
            color="#DCA42D"
          />
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <HeadingText>getUptime</HeadingText>
            <MonoText> {this.state.uptime}</MonoText>
          </View>
          <Button onPress={this._getUptime} title="getUptime" color="#DCA42D" />
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <HeadingText>isRootedExperimental</HeadingText>
            <MonoText> {this.state.isRooted}</MonoText>
          </View>
          <Button onPress={this._isRooted} title="isRootedExperimental" color="#DCA42D" />
        </View> */}
      </ScrollView>
    );
  }
}
