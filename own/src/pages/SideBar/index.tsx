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
import { useSelector } from "react-redux";
import { getModeCss } from "../../redux/NotesSlice";

interface Properties {
  isExpand?: any;
}
const Sidebar = ({ isExpand }: Properties) => {
  // Dynamic colors based on theme
  const modeCss = useSelector(getModeCss);

  return (
    <Flex>
      <Box
        bg={modeCss.bgColor}
        w={isExpand ? "200px" : "60px"}
        h="95%"
        p={4}
        color={modeCss.textColor}
        transition="width 0.2s"
      >
        <VStack spacing={4} alignItems={isExpand ? "flex-start" : "center"}>
          <Flex align="center" w="full">
            <IconButton
              size="md"
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
              size="md"
              icon={<MdLabel />}
              aria-label="Refresh"
              bg="transparent"
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
              size="md"
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
