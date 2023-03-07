import {PermissionsAndroid} from 'react-native';
export const PermisionStorage = callback => {
  try {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'storage title',
        message: 'storage_permission',
      },
    ).then(granted => {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //Once user grant the permission start downloading
        console.log('Storage Permission');
        callback();
      } else {
        //If permission denied then show alert 'Storage Permission
        alert('permission to download');
      }
    });
  } catch (err) {
    //To handle permission related issue
    alert('error');
    console.log('error', err);
  }
};
