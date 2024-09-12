/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { deleteNote, getModeCss, updateNote } from "../../redux/NotesSlice";
import { useDispatch, useSelector } from "react-redux";
import { GoPin } from "react-icons/go";
import {
  MdOutlineColorLens,
  MdArchive,
  MdLabelOutline,
  MdMoreVert,
  MdDelete,
} from "react-icons/md";
import { AppDispatch } from "../../redux/store/store";

const NoteModal = ({ note, isModalOpen, onModalOpen, onModalClose }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const modeCss = useSelector(getModeCss);
  const [noteValue, setNoteValue] = useState(note.note);
  const [headingValue, setHeadingValue] = useState(note.heading);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleDelete = () => {
    dispatch(deleteNote(note.id));
  };

  useEffect(() => {
    const newNote: any = {
      heading: headingValue,
      note: noteValue,
      isArchive: false,
      isTrash: false,
    };
    const noteUpdate = setTimeout(() => {
      dispatch(updateNote({ noteId: note._id, updatedData: newNote }));
    }, 500);
    return () => clearTimeout(noteUpdate);
  }, [dispatch, headingValue, note._id, noteValue]);

  return (
    <>
      {isModalOpen && (
        <Modal
          blockScrollOnMount={false}
          isOpen={isModalOpen}
          onClose={onModalClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalBody p={0}>
              <Flex
                flexDir={"column"}
                justifyContent={"space-between"}
                bg={modeCss.bgColor}
                p={4}
                borderRadius="md"
                height="100%"
                boxShadow="md"
                maxW="600px"
                mx="auto"
                mt="20px"
                transition="all 0.3s"
                onClick={onModalOpen}
              >
                <Flex flexDir={"column"}>
                  <Flex
                    justifyContent="space-between"
                    mb={2}
                    gap={1}
                    alignItems="center"
                  >
                    <Input
                      color={modeCss.textColor}
                      value={headingValue}
                      onChange={(e: any) => setHeadingValue(e.target.value)}
                      cursor={"pointer"}
                      bg={modeCss.inputBgColor}
                    />
                    <IconButton
                      size="md"
                      icon={<GoPin />}
                      aria-label="Pin"
                      bg="transparent"
                      color={modeCss.iconColor}
                      _hover={{ bg: modeCss.hoverBg }}
                    />
                  </Flex>
                  <Textarea
                    ref={textareaRef}
                    onInput={handleInput}
                    value={noteValue}
                    onChange={(e) => setNoteValue(e.target.value)}
                    placeholder="Type your message here..."
                    bg={modeCss.inputBgColor}
                    color={modeCss.textColor}
                    cursor={"pointer"}
                    _placeholder={{
                      color: useColorModeValue("gray.200", "gray.700"),
                    }}
                    mb={4}
                    resize="none"
                    overflow="hidden"
                  />
                </Flex>

                <HStack spacing={1} justifyContent="flex-end">
                  <IconButton
                    size="md"
                    icon={<MdOutlineColorLens />}
                    aria-label="Color Change"
                    bg="transparent"
                    color={modeCss.iconColor}
                    _hover={{ bg: modeCss.hoverBg }}
                  />
                  <IconButton
                    size="md"
                    icon={<MdArchive />}
                    aria-label="Archive"
                    bg="transparent"
                    color={modeCss.iconColor}
                    _hover={{ bg: modeCss.hoverBg }}
                  />
                  <IconButton
                    size="md"
                    icon={<MdLabelOutline />}
                    aria-label="Label"
                    bg="transparent"
                    color={modeCss.iconColor}
                    _hover={{ bg: modeCss.hoverBg }}
                  />
                  <IconButton
                    size="md"
                    icon={<MdMoreVert />}
                    aria-label="More"
                    bg="transparent"
                    color={modeCss.iconColor}
                    _hover={{ bg: modeCss.hoverBg }}
                  />
                  <IconButton
                    size="md"
                    icon={<MdDelete />}
                    aria-label="Delete"
                    bg="transparent"
                    color={modeCss.iconColor}
                    _hover={{ bg: modeCss.hoverBg }}
                    onClick={handleDelete}
                  />
                  {/* <Button variant="ghost" onClick={onModalClose}>
                    Close
                  </Button> */}
                </HStack>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default NoteModal;
