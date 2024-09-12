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

const ExpandableInputComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState(""); // State to manage input value
  const [noteDesc, setNoteDesc] = useState(""); // State to manage note description
  const dispatch: any = useDispatch();
  const textareaRef: any = useRef(null);
  const componentRef = useRef(null); // Ref for the entire component
  const modeCss = useSelector(getModeCss);

  // Function to adjust the height of the textarea automatically
  const handleInput = () => {
    textareaRef.current.style.height = "auto"; // Reset the height to calculate the new height
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the height to match the content
  };

  // Use effect to handle clicks outside the component
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
        setInputValue(""); // Clear the input value
        setNoteDesc(""); // Clear the note description
        setIsExpanded(false); // Collapse the component
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue, noteDesc, dispatch]);

  // Handle closing without dispatching
  const handleClose = () => {
    setIsExpanded(false);
    setInputValue(""); // Clear the input value
    setNoteDesc(""); // Clear the note description
  };

  return (
    <Box
      ref={componentRef} // Attach ref to the component
      bg={modeCss.bgColor}
      p={4}
      borderRadius="md"
      height={"100%"}
      boxShadow="md"
      maxW="600px"
      mx="auto"
      mt={"20px"}
      transition="all 0.3s"
    >
      {/* First row: Heading and Pin icon */}
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

      {/* Second row: Textarea input (Full width) - visible only when expanded */}
      {isExpanded && (
        <Textarea
          ref={textareaRef}
          onInput={handleInput} // Adjust height on input
          value={noteDesc}
          onChange={(e) => setNoteDesc(e.target.value)}
          placeholder="Type your message here..."
          bg={modeCss.inputBgColor}
          color={modeCss.textColor}
          _placeholder={{ color: useColorModeValue("gray.500", "gray.400") }}
          mb={4}
          resize="none" // Disable manual resizing, handle resizing automatically
          overflow="hidden" // Hide scrollbars, auto-adjust height
        />
      )}

      {/* Third row: Icons - visible only when expanded */}
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
          <Button
            onClick={handleClose} // Call handleClose to clear fields
            variant="ghost"
          >
            Close
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default ExpandableInputComponent;
