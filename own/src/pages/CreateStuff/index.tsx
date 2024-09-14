/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Textarea,
  HStack,
  useColorModeValue,
  Input,
  Button,
} from "@chakra-ui/react";
import {
  MdLabelOutline,
  MdOutlineColorLens,
  MdArchive,
  MdMoreVert,
  MdDelete,
} from "react-icons/md";
import { GoPin } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { createNote, getModeCss } from "../../redux/NotesSlice";
import { AppDispatch } from "../../redux/store/store";

const ExpandableInputComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const textareaRef: any = useRef(null);
  const componentRef = useRef(null);
  const modeCss = useSelector(getModeCss);

  const handleInput = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        if (inputValue || noteDesc) {
          const requestBody = {
            heading: inputValue,
            note: noteDesc,
            isArchive: false,
            isTrash: false,
          };
          await dispatch(createNote(requestBody));
        }
        setInputValue("");
        setNoteDesc("");
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue, noteDesc, dispatch]);

  const handleClose = () => {
    setIsExpanded(false);
    setInputValue("");
    setNoteDesc("");
  };

  return (
    <Box
      ref={componentRef}
      bg={modeCss.bgColor}
      p={2}
      borderRadius="md"
      height={"100%"}
      boxShadow="md"
      maxW="600px"
      mx="auto"
      mt={"20px"}
      transition="all 0.3s"
    >
      <Flex
        justifyContent="space-between"
        mb={2}
        gap={1}
        cursor="pointer"
        onClick={() => {
          setIsExpanded(true);
        }}
      >
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          color={modeCss.textColor}
          placeholder="Basic usage"
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

      {isExpanded && (
        <Textarea
          ref={textareaRef}
          onInput={handleInput}
          value={noteDesc}
          onChange={(e) => setNoteDesc(e.target.value)}
          placeholder="Type your message here..."
          bg={modeCss.inputBgColor}
          color={modeCss.textColor}
          _placeholder={{ color: useColorModeValue("gray.500", "gray.400") }}
          mb={1}
          resize="none"
          overflow="hidden"
        />
      )}

      {isExpanded && (
        <HStack spacing={4} justifyContent="flex-end">
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
          />
          <Button onClick={handleClose} variant="ghost">
            Close
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default ExpandableInputComponent;
