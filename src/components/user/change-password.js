import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { userHandler } from "../../handlers/users";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handlePasswordConfChange = e => {
    setPasswordConf(e.target.value);
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const params = { password, passwordConf };
      await userHandler.changePassword(params);
    } catch (error) {
      console.log("Error changing password:", error.toString());
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       Cambiar password 
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Cambiar password</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Password"
              type="password"
              name="password"
              onChange={handlePasswordChange}
              value={password}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password Confirmation"
              type="password"
              name="passwordConf"
              onChange={handlePasswordConfChange}
              value={passwordConf}
            />
            <Button color='Primary' type="submit">Cambiar Password</Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
