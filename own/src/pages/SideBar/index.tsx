/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, IconButton, VStack, Text } from "@chakra-ui/react";
import { MdLabel } from "react-icons/md";
import { useSelector } from "react-redux";
import { getModeCss } from "../../redux/NotesSlice";

interface Properties {
  isExpand?: any;
  setIsExpand?: any;
}
const Sidebar = ({ isExpand, setIsExpand }: Properties) => {
  const modeCss = useSelector(getModeCss);

  const toggleSidebar = (e: any) => {
    if (e.type === "mouseleave") {
      setIsExpand(false);
    } else {
      setIsExpand(true);
    }
  };

  return (
    <Flex>
      <Box
        bg={modeCss.bgColor}
        w={isExpand ? "200px" : "60px"}
        h="100%"
        p={1}
        color={modeCss.textColor}
        transition="width 0.2s"
      >
        <VStack
          onMouseEnter={(e: any) => toggleSidebar(e)}
          onMouseLeave={(e: any) => toggleSidebar(e)}
          spacing={6}
          alignItems={isExpand ? "flex-start" : "center"}
        >
          <Flex align="center" w="full">
            <IconButton
              size="lg"
              icon={<MdLabel />}
              aria-label="Search"
              bg="transparent"
              color={modeCss.iconColor}
              _hover={{ bg: modeCss.hoverBg }}
            />
            {isExpand && (
              <Text ml={4} color={modeCss.textColor}>
                label 1
              </Text>
            )}
          </Flex>

          <Flex align="center" w="full">
            <IconButton
              size="lg"
              // border={}
              icon={<MdLabel />}
              aria-label="Refresh"
              // bg="transparent"
              color={modeCss.iconColor}
              _hover={{ bg: modeCss.hoverBg }}
            />
            {isExpand && (
              <Text ml={4} color={modeCss.textColor}>
                label 2
              </Text>
            )}
          </Flex>

          <Flex align="center" w="full">
            <IconButton
              size="lg"
              icon={<MdLabel />}
              aria-label="Settings"
              bg="transparent"
              color={modeCss.iconColor}
              _hover={{ bg: modeCss.hoverBg }}
            />
            {isExpand && (
              <Text ml={4} color={modeCss.textColor}>
                label 3
              </Text>
            )}
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Sidebar;
