import { Stack } from 'expo-router';

export default function ReceptionistLayout() {
  return (
    <Stack>
      <Stack.Screen name="ReceptionistPage" options={{ headerShown: false }} />
      <Stack.Screen name="AddAppointment" options={{ headerShown: false }} />
      <Stack.Screen name="AppointmentInfo" options={{ headerShown: false }} />
      <Stack.Screen name="Appointments" options={{ headerShown: false }} />
      <Stack.Screen name="DocMgmt" options={{ headerShown: false }} />
      <Stack.Screen name="FormTemplate" options={{ headerShown: false }} />
      <Stack.Screen name="PatientMgmt" options={{ headerShown: false }} />
      <Stack.Screen name="PatientTab" options={{ headerShown: false }} />
      <Stack.Screen name="Search" options={{ headerShown: false }} />
      <Stack.Screen name="TemplateRenderer" options={{ headerShown: false }} />
    </Stack>
  );
} 