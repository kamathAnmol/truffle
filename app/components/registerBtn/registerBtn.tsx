import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Chip,
} from "@nextui-org/react";
import { MailIcon } from "@/public/assests/MailIcon";
import { LockIcon } from "@/public/assests/LockIcon";
import { User2 } from "lucide-react";
import { EmailRegister, createUserDoc } from "@/lib/firebase";
import { AuthError, UserCredential, UserInfo } from "firebase/auth";

const RegisterBtn = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined | any>();

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      setError("All Fields Are Required");
      return;
    }
    try {
      const UserCredential: UserCredential | undefined = await EmailRegister(
        name,
        email,
        password
      );
      const user: UserInfo | undefined = UserCredential?.user;
      await createUserDoc(user, { name });
      onClose();
    } catch (error: any) {
      console.log("error while registering", error);
      setError(error.code);
    }
  };

  return (
    <>
      <Button color="warning" variant="flat" onClick={onOpen}>
        Sign Up
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Register
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={<User2 strokeWidth={2} color="grey" />}
                  label="Name"
                  placeholder="Enter your Name"
                  variant="bordered"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />

                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex py-2 px-1 justify-between">
                  {error && (
                    <Chip color="danger" radius="sm" variant="dot">
                      {error}
                    </Chip>
                  )}
                  {/* <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" onPress={handleSubmit}>
                  Sign Up
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegisterBtn;
