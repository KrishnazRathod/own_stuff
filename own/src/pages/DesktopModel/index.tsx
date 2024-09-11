/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../SideBar";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import ExpandableInputComponent from "../CreateStuff";
import CustomizableCardGrid from "../Stuff";
import { useDispatch } from "react-redux";
import { fetchNotes } from "../../redux/NotesSlice";

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const bgColor = useColorModeValue("gray.300", "gray.600");
  const [note, setNotes] = useState();
  const dispatch: any = useDispatch();
  console.log("note:", note);

  useEffect(() => {
    dispatch(fetchNotes()).then((response: any) => {
      setNotes(response.payload);
    });
  }, []);

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
