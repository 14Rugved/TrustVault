import { Text, View } from "react-native";
import Login from './../components/Login';
import Header from './tabs/Header';
import MainPage from './tabs/MainPage';
import HealthCare from './DomainTabs/HealthCare';
import ViewDocuments from './DomainTabs/ViewDocuments';
import ViewPrescriptions from './DomainTabs/ViewPrescriptions';
import SetReminder from './DomainTabs/SetReminder'; 

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Login />
      {/* <MainPage /> */}
      {/* <HealthCare /> */}
      {/* <ViewDocuments /> */}
      {/* <ViewPrescriptions /> */}
      {/* <SetReminder /> */}
      
    </View>
  );
}
