import { useRef, useState } from "react";
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
import { AttachmentIcon } from "@chakra-ui/icons";
import {
  MdLabelOutline,
  MdOutlineColorLens,
  MdArchive,
  MdMoreVert,
  MdDelete,
} from "react-icons/md";
import { GoPin } from "react-icons/go";

const ExpandableInputComponent = () => {
  // State to track whether the component is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  // Ref for the Textarea to manage its height
  const textareaRef = useRef(null);

  // Function to toggle the expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to adjust the height of the textarea automatically
  const handleInput = () => {
    textareaRef.current.style.height = "auto"; // Reset the height to calculate the new height
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the height to match the content
  };

  // Dynamic colors for light and dark themes
  const bgColor = useColorModeValue("gray.100", "gray.800"); // Light: gray.100, Dark: gray.800
  const inputBgColor = useColorModeValue("gray.200", "gray.700"); // Textarea background color based on theme
  const textColor = useColorModeValue("black", "white"); // Light: black, Dark: white
  const hoverBg = useColorModeValue("gray.300", "gray.700"); // Hover effect color
  const iconColor = useColorModeValue("black", "white"); // Icon color

  return (
    <Box
      bg={bgColor}
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
        <Input color={textColor} placeholder="Basic usage" />
        <IconButton
          size="md"
          icon={<GoPin />}
          aria-label="Pin"
          bg="transparent"
          color={iconColor}
          _hover={{ bg: hoverBg }}
        />
      </Flex>

      {/* Second row: Textarea input (Full width) - visible only when expanded */}
      {isExpanded && (
        <Textarea
          ref={textareaRef}
          onInput={handleInput} // Adjust height on input
          placeholder="Type your message here..."
          bg={inputBgColor}
          color={textColor}
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
            aria-label="More"
            bg="transparent"
            color={iconColor}
            _hover={{ bg: hoverBg }}
          />
          <Button
            onClick={() => {
              setIsExpanded(false);
            }}
            // colorScheme="teal"
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
