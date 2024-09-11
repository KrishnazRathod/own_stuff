import React, { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon, RepeatIcon, SettingsIcon } from "@chakra-ui/icons";

interface Properties {
  isExpand?: any;
}
const Sidebar = ({ isExpand }: Properties) => {
  // Dynamic colors based on theme
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const iconColor = useColorModeValue("black", "white");
  const hoverBg = useColorModeValue("gray.300", "gray.700");
  const textColor = useColorModeValue("black", "white");

  return (
    <Flex>
      <Box
        bg={bgColor}
        w={isExpand ? "200px" : "60px"}
        h="100vh"
        p={4}
        color={textColor}
        transition="width 0.2s"
      >
        <VStack spacing={4} alignItems={isExpand ? "flex-start" : "center"}>
          <Flex align="center" w="full">
            <IconButton
              size="md"
              icon={<SearchIcon />}
              aria-label="Search"
              bg="transparent"
              color={iconColor}
              _hover={{ bg: hoverBg }}
            />
            {isExpand && (
              <Text ml={4} color={textColor}>
                Search
              </Text>
            )}
          </Flex>

          <Flex align="center" w="full">
            <IconButton
              size="md"
              icon={<RepeatIcon />}
              aria-label="Refresh"
              bg="transparent"
              color={iconColor}
              _hover={{ bg: hoverBg }}
            />
            {isExpand && (
              <Text ml={4} color={textColor}>
                Refresh
              </Text>
            )}
          </Flex>

          <Flex align="center" w="full">
            <IconButton
              size="md"
              icon={<SettingsIcon />}
              aria-label="Settings"
              bg="transparent"
              color={iconColor}
              _hover={{ bg: hoverBg }}
            />
            {isExpand && (
              <Text ml={4} color={textColor}>
                Settings
              </Text>
            )}
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Sidebar;
