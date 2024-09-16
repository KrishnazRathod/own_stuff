/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  InputGroup,
  Input,
  InputLeftElement,
  HStack,
  useColorMode,
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
import { useDispatch, useSelector } from "react-redux";
import { getModeCss, HandleModeCss } from "../../redux/NotesSlice";

interface Properties {
  setIsExpand?: any;
  isExpand?: any;
}

const Navbar = ({ setIsExpand, isExpand }: Properties) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch: any = useDispatch();
  const modeCss = useSelector(getModeCss);

  const toggleSidebar = () => {
    setIsExpand(!isExpand);
  };

  useEffect(() => {
    dispatch(HandleModeCss(colorMode));
  }, [colorMode, dispatch]);

  return (
    <Box bg={modeCss.bgColor} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={4}>
          <IconButton
            size="md"
            icon={<HamburgerIcon />}
            onClick={toggleSidebar}
            aria-label="Menu"
            bg="transparent"
            color={modeCss.textColor}
            _hover={{ bg: modeCss.hoverBg }}
          />
          <Box fontSize="3xl" fontWeight="bold" color={modeCss.textColor}>
            STUFF
          </Box>
        </HStack>

        <InputGroup maxW="600px" flex="1" mx={8}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color={modeCss.textColor} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search..."
            bg={modeCss.inputBgColor}
            color={modeCss.textColor}
          />
          modeCss.
        </InputGroup>

        <HStack spacing={4}>
          <IconButton
            size="md"
            icon={<RepeatIcon />}
            aria-label="Refresh"
            bg="transparent"
            color={modeCss.textColor}
            _hover={{ bg: modeCss.hoverBg }}
          />
          <IconButton
            size="md"
            icon={<SettingsIcon />}
            aria-label="Settings"
            bg="transparent"
            color={modeCss.textColor}
            _hover={{ bg: modeCss.hoverBg }}
          />
          <IconButton
            size="md"
            icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
            aria-label="Toggle Color Mode"
            onClick={() => {
              toggleColorMode();
            }}
            bg="transparent"
            color={modeCss.textColor}
            _hover={{ bg: modeCss.hoverBg }}
          />
          <Avatar size="md" name="Profile" />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
