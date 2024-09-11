import React, { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  InputGroup,
  Input,
  InputLeftElement,
  HStack,
  useColorMode,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  SearchIcon,
  RepeatIcon,
  SettingsIcon,
  SunIcon,
  MoonIcon,
} from "@chakra-ui/icons";

interface Properties {
  setIsExpand?: any;
  isExpand?: any;
}

const Navbar = ({ setIsExpand, isExpand }: Properties) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const toggleSidebar = () => {
    setIsExpand(!isExpand);
  };
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const inputBgColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const hoverBg = useColorModeValue("gray.300", "gray.700");
  return (
    <Box bg={bgColor} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={4}>
          <IconButton
            size="md"
            icon={<HamburgerIcon />}
            onClick={toggleSidebar}
            aria-label="Menu"
            bg="transparent"
            color={textColor}
            _hover={{ bg: hoverBg }}
          />
          <Box fontSize="3xl" fontWeight="bold" color={textColor}>
            STUFF
          </Box>
        </HStack>

        <InputGroup maxW="600px" flex="1" mx={8}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color={textColor} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search..."
            bg={inputBgColor}
            color={textColor}
          />
        </InputGroup>

        <HStack spacing={4}>
          <IconButton
            size="md"
            icon={<RepeatIcon />}
            aria-label="Refresh"
            bg="transparent"
            color={textColor}
            _hover={{ bg: hoverBg }}
          />
          <IconButton
            size="md"
            icon={<SettingsIcon />}
            aria-label="Settings"
            bg="transparent"
            color={textColor}
            _hover={{ bg: hoverBg }}
          />
          <IconButton
            size="md"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            bg="transparent"
            color={textColor}
            _hover={{ bg: hoverBg }}
          />
          <Avatar size="sm" name="Profile" />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
