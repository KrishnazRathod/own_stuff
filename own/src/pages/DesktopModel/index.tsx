import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../SideBar";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import ExpandableInputComponent from "../CreateStuff";
import CustomizableCardGrid from "../Stuff";

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const bgColor = useColorModeValue("gray.300", "gray.600");

  return (
    <>
      <Flex flexDir={"column"} bg={bgColor}>
        <Navbar setIsExpand={setIsExpanded} isExpand={isExpanded} />
        <Flex>
          <Sidebar isExpand={isExpanded} />
          <Flex
            w={"100%"}
            h={"100%"}
            flexDir={"column"}
            justifyContent={"center"}
          >
            <Box>
              <ExpandableInputComponent />
            </Box>
            <Box>
              <CustomizableCardGrid />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
