import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Textarea,
  Input,
  HStack,
  useColorModeValue,
  Button,
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
import { useDispatch } from "react-redux";
import { deleteNote } from "../../redux/NotesSlice";

const ExpandableCard = ({
  id,
  heading,
  note,
  isArchive,
  isTrash,
  createdAt,
  updatedAt,
  onHeightChange, // Callback to inform parent of height change
}: any) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [noteValue, setNoteValue] = useState(note);
  const [headingValue, setHeadingValue] = useState(heading);
  const [currentHeight, setCurrentHeight] = useState(0);
  const dispatch = useDispatch(); // Use dispatch for actions

  const roundUpToNearest100 = (number: any) => {
    return Math.ceil(number / 100) * 100;
  };

  // Handle the resizing of the textarea dynamically
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = textareaRef.current.scrollHeight;

      if (newHeight !== currentHeight) {
        textareaRef.current.style.height = `${roundUpToNearest100(
          newHeight
        )}px`;
        setCurrentHeight(roundUpToNearest100(newHeight));
        onHeightChange(roundUpToNearest100(newHeight)); // Notify parent about the height change
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

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const inputBgColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const hoverBg = useColorModeValue("gray.300", "gray.700");
  const iconColor = useColorModeValue("black", "white");

  const handleDelete = () => {
    // Dispatch deleteNote action with the note id
    dispatch(deleteNote(id));
  };

  return (
    <Box
      bg={bgColor}
      p={4}
      borderRadius="md"
      height="100%"
      boxShadow="md"
      maxW="600px"
      mx="auto"
      mt="20px"
      transition="all 0.3s"
    >
      <Flex justifyContent="space-between" mb={2} gap={1} alignItems="center">
        {/* Drag Handle Icon - Only this element is draggable */}
        <IconButton
          size="md"
          icon={<MdDragIndicator />}
          aria-label="Drag Handle"
          bg="transparent"
          color={iconColor}
          _hover={{ bg: hoverBg }}
          className="drag-handle" // Mark only this button as draggable
        />

        {/* Heading and Pin icon */}
        <Input
          color={textColor}
          value={headingValue}
          onChange={(e) => setHeadingValue(e.target.value)}
        />
        <IconButton
          size="md"
          icon={<GoPin />}
          aria-label="Pin"
          bg="transparent"
          color={iconColor}
          _hover={{ bg: hoverBg }}
        />
      </Flex>

      {/* Textarea input */}
      {isExpanded && (
        <Textarea
          ref={textareaRef}
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
          onInput={handleInput} // Adjust height on input
          placeholder="Type your message here..."
          bg={inputBgColor}
          color={textColor}
          _placeholder={{ color: useColorModeValue("gray.500", "gray.400") }}
          mb={4}
          resize="none"
          overflow="hidden"
        />
      )}

      {/* Icons */}
      {isExpanded && (
        <HStack spacing={1} justifyContent="flex-end">
          <IconButton
            size="md"
            icon={<MdOutlineColorLens />}
            aria-label="Color Change"
            bg="transparent"
            color={iconColor}
            _hover={{ bg: hoverBg }}
          />
          <IconButton
            size="md"
            icon={<MdArchive />}
            aria-label="Archive"
            bg="transparent"
            color={iconColor}
            _hover={{ bg: hoverBg }}
          />
          <IconButton
            size="md"
            icon={<MdLabelOutline />}
            aria-label="Label"
            bg="transparent"
            color={iconColor}
            _hover={{ bg: hoverBg }}
          />
          <IconButton
            size="md"
            icon={<MdMoreVert />}
            aria-label="More"
            bg="transparent"
            color={iconColor}
            _hover={{ bg: hoverBg }}
          />
          <IconButton
            size="md"
            icon={<MdDelete />}
            aria-label="Delete"
            bg="transparent"
            color={iconColor}
            _hover={{ bg: hoverBg }}
            onClick={handleDelete} // Call handleDelete on click
          />
          <Button onClick={() => setIsExpanded(false)} variant="ghost">
            Close
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default ExpandableCard;
