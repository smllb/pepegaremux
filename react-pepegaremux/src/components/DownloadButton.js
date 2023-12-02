import Button from '@mui/material/Button';

function GenericButton({label, onChange}) {
  return (
    <Button variant="contained" color="primary" onChange={onChange}>
      {label}
    </Button>
  );
}

export default GenericButton