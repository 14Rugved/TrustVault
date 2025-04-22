import { Stack } from 'expo-router';

const App = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReceptionistPage" options={{ title: 'Receptionist' }} />
      <Stack.Screen name="PatientTab" options={{ title: 'Patient' }} />
      <Stack.Screen name="PatientMgmt" options={{ title: 'Patient mgmt' }} />
      <Stack.Screen name="DocMgmt" options={{ title: 'Doctor Management' }} />
      <Stack.Screen name="FormTemplate" options={{ title: 'Form Template' }} />
      <Stack.Screen name="prescriptionTemplate" options={{ title: 'prescription template' }} />
      <Stack.Screen name="TemplateRenderer" options={{ title: 'template renderer' }} />
      <Stack.Screen name="PatientManagement" options={{ title: 'Patient Management' }} />
    </Stack>
  );
};

export default App;
