/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import {
  Flex,
  IconButton,
  Textarea,
  HStack,
  useColorModeValue,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MdLabelOutline,
  MdOutlineColorLens,
  MdArchive,
  MdMoreVert,
  MdDelete,
  MdDragIndicator,
} from "react-icons/md";
import { GoPin } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, getModeCss } from "../../redux/NotesSlice";
import NoteModal from "../NoteModal";
import { AppDispatch } from "../../redux/store/store";

const ExpandableCard = ({ noteData, onHeightChange }: any) => {
  const textareaRef = useRef<any>(null);
  const modeCss = useSelector(getModeCss);

  const [currentHeight, setCurrentHeight] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const roundUpToNearest100 = (number: any) => {
    return Math.ceil(number / 100) * 100;
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = textareaRef.current.scrollHeight;

      if (newHeight !== currentHeight) {
        textareaRef.current.style.height = `${roundUpToNearest100(
          newHeight
        )}px`;
        setCurrentHeight(roundUpToNearest100(newHeight));
        onHeightChange(roundUpToNearest100(newHeight));
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      const initialHeight = textareaRef.current.scrollHeight;
      if (initialHeight !== currentHeight) {
        setCurrentHeight(initialHeight);
        onHeightChange(initialHeight);
      }
    }
  }, [currentHeight, onHeightChange]);

  const handleDelete = () => {
    dispatch(deleteNote(noteData._id));
  };

  return (
    <>
      <Flex
        flexDir={"column"}
        justifyContent={"space-between"}
        bg={modeCss.bgColor}
        p={1}
        borderRadius="md"
        height="100%"
        boxShadow="md"
        maxW="600px"
        mx="auto"
        mt="20px"
        transition="all 0.3s"
        onClick={onOpen}
      >
        <Flex flexDir={"column"}>
          <Flex
            justifyContent="space-between"
            mb={2}
            gap={1}
            alignItems="center"
          >
            <Flex alignItems={"center"}>
              <IconButton
                size="md"
                icon={<MdDragIndicator />}
                aria-label="Drag Handle"
                bg="transparent"
                color={modeCss.iconColor}
                _hover={{ bg: modeCss.hoverBg }}
                className="drag-handle"
                onClick={(e) => e.stopPropagation()}
              />
              <Text as="b" color={modeCss.textColor}>
                {noteData.heading}
              </Text>
            </Flex>
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
            h={"100%"}
            ref={textareaRef}
            value={noteData.note}
            onInput={handleInput}
            placeholder="Type your message here..."
            bg={"transparent"}
            border={"none"}
            color={modeCss.textColor}
            cursor={"pointer"}
            _placeholder={{
              color: useColorModeValue("gray.200", "gray.700"),
            }}
            mb={4}
            resize="none"
            // overflow="hidden"
            readOnly
          />
        </Flex>

        <HStack
          spacing={1}
          justifyContent="flex-end"
          onClick={(e) => e.stopPropagation()}
        >
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
        </HStack>
      </Flex>
      <NoteModal
        isModalOpen={isOpen}
        note={noteData}
        onModalOpen={onOpen}
        onModalClose={onClose}
      />
    </>
  );
};

export default ExpandableCard;
