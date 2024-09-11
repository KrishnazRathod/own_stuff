/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { MdLabel } from "react-icons/md";

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
        h="95%"
        p={4}
        color={textColor}
        transition="width 0.2s"
      >
        <VStack spacing={4} alignItems={isExpand ? "flex-start" : "center"}>
          <Flex align="center" w="full">
            <IconButton
              size="md"
              icon={<MdLabel />}
              aria-label="Search"
              bg="transparent"
              color={iconColor}
              _hover={{ bg: hoverBg }}
            />
            {isExpand && (
              <Text ml={4} color={textColor}>
                label 1
              </Text>
            )}
          </Flex>

          <Flex align="center" w="full">
            <IconButton
              size="md"
              icon={<MdLabel />}
              aria-label="Refresh"
              bg="transparent"
              color={iconColor}
              _hover={{ bg: hoverBg }}
            />
            {isExpand && (
              <Text ml={4} color={textColor}>
                label 2
              </Text>
            )}
          </Flex>

          <Flex align="center" w="full">
            <IconButton
              size="md"
              icon={<MdLabel />}
              aria-label="Settings"
              bg="transparent"
              color={iconColor}
              _hover={{ bg: hoverBg }}
            />
            {isExpand && (
              <Text ml={4} color={textColor}>
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
