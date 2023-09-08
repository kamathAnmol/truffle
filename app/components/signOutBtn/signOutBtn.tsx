import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { signOutUser } from "@/lib/firebase";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/root-reducer";

const SignOutBtn = () => {
  const user = useSelector(selectCurrentUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const signOut = async () => {
    try {
      console.log(user);
      await signOutUser();
      console.log(user);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button color="warning" variant="ghost" onClick={onOpen}>
        Sign Out
      </Button>
      <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Sign Out
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to{" "}
                  <span className=" font-bold ">Sign Out</span>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="warning" onPress={signOut}>
                  Sign Out
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignOutBtn;
