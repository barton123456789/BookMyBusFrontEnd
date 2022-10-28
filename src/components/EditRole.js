import { Container } from "@mui/material";
import userEvent from "@testing-library/user-event";
import React from "react";

const initialValue = {
  role: "",
};

function EditRole() {
  return (
    <>
      <Container>
        <Typography variant="h4">Change Role</Typography>
        <FormControl>
          <InputLabel htmlFor="my-input">Role</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="type"
            value={user.role}
            id="my-input"
          />
        </FormControl>
        <FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => changeUserRole()}
          >
            Switch
          </Button>
        </FormControl>
      </Container>
    </>
  );
}

export default EditRole;
