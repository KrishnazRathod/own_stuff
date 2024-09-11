import React, { useState, useRef } from "react";
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
import { AttachmentIcon } from "@chakra-ui/icons";
import {
  MdLabelOutline,
  MdOutlineColorLens,
  MdArchive,
  MdMoreVert,
} from "react-icons/md";

const ExpandableCard = ({ id }: any) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const textareaRef = useRef(null);

  const handleInput = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const inputBgColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const hoverBg = useColorModeValue("gray.300", "gray.700");
  const iconColor = useColorModeValue("black", "white");

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
      {/* First row: Heading and Pin icon */}
      <Flex
        justifyContent="space-between"
        mb={2}
        cursor="pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Input color={textColor} placeholder="Basic usage" />
        <IconButton
          size="md"
          icon={<AttachmentIcon />}
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
          <Button onClick={() => setIsExpanded(false)} variant="ghost">
            Close
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default ExpandableCard;
