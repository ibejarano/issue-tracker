import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {userHandler} from '../../handlers/users';

export default function MaterialTableDemo() {
  const [userData, setUserData] = React.useState([
    {username: '', email: '', role: 99},
  ]);

  const cols = [
    {title: 'Nombre de usuario', field: 'username'},
    {title: 'E-mail', field: 'email'},
    {
      title: 'Rol',
      field: 'role',
      lookup: {0: 'Administrator', 1: 'User', 2: 'Developer', 99: ' '},
    },
  ];

  const [loadingUsers, setLoadingUsers] = React.useState(true);

  const handleUpdate = async (newData, oldData) => {
    try {
      const id = oldData._id;
      await userHandler.update(id, newData);
      setLoadingUsers(true);
    } catch (error) {
      console.log('Error during user update!');
      console.log(error.toString());
    }
  };

  const handleDelete = async userData => {
    try {
      const id = userData._id;
      await userHandler.deleteById(id);
      setLoadingUsers(true);
    } catch (error) {
      console.log('Error during user delete!');
    }
  };

  useEffect(() => {
    if (loadingUsers) {
      console.log('Running Effect again');
      userHandler
        .getAllUsers()
        .then(data => {
          setUserData(data);
          setLoadingUsers(false);
        })
        .catch(error => {
          window.location = '/user';
        });
    }
  }, [loadingUsers]);

  return (
      <MaterialTable
        title="Editar usuario"
        columns={cols}
        data={userData}
        editable={{
          onRowUpdate: handleUpdate,
          onRowDelete: handleDelete,
        }}
      />
  );
}
