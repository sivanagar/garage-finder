import { Button, Stack } from "@chakra-ui/react";

const ButtonVariants = () => {
  return (
    <Stack>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="warning">warning</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
    </Stack>
  );
};

export default ButtonVariants;
