import {
  Flex,
  IconButton,
  Textarea,
  useColorModeValue,
  HStack,
  Button,
  Input,
} from "@chakra-ui/react";
import { GoPin } from "react-icons/go";
import {
  MdDragIndicator,
  MdOutlineColorLens,
  MdArchive,
  MdLabelOutline,
  MdMoreVert,
  MdDelete,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { getModeCss } from "../redux/NotesSlice";

const NoteBody = () => {
  const modeCss = useSelector(getModeCss);

  return (
    <>
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
        onClick={onOpen}
      >
        <Flex flexDir={"column"}>
          <Flex
            justifyContent="space-between"
            mb={2}
            gap={1}
            alignItems="center"
          >
            {/* Drag Handle Icon - Only this element is draggable */}
            <IconButton
              size="md"
              icon={<MdDragIndicator />}
              aria-label="Drag Handle"
              bg="transparent"
              color={modeCss.iconColor}
              _hover={{ bg: modeCss.hoverBg }}
              className="drag-handle" // Mark only this button as draggable
            />

            {/* Heading and Pin icon */}
            <Input
              color={modeCss.textColor}
              value={headingValue}
              onChange={(e) => setHeadingValue(e.target.value)}
              readOnly
              cursor={"pointer"}
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
          {/* Textarea input */}
          <Textarea
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
            placeholder="Type your message here..."
            bg={"transparent"}
            border={"none"}
            // bg={modeCss.inputBgColor}
            color={modeCss.textColor}
            cursor={"pointer"}
            _placeholder={{
              color: useColorModeValue("gray.200", "gray.700"),
            }}
            mb={4}
            resize="none"
            overflow="hidden"
            readOnly
          />
        </Flex>

        {/* Icons */}
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
          <Button variant="ghost">Close</Button>
        </HStack>
      </Flex>
    </>
  );
};

export default NoteBody;
