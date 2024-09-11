import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ExpandableCard from "../NoteCard";
import { Box } from "@chakra-ui/react";

const CustomizableCardGrid = () => {
  const [layout, setLayout] = useState([
    { i: "card1", x: 0, y: 0, w: 3, h: 3 },
    { i: "card2", x: 3, y: 0, w: 3, h: 3 },
    { i: "card3", x: 6, y: 0, w: 3, h: 3 },
  ]);

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };

  return (
    <Box maxW="100%" mx="auto" p={6}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={1200}
        onLayoutChange={onLayoutChange}
        draggableHandle=".drag-handle"
      >
        <div key="card1" className="drag-handle">
          <ExpandableCard id="card1" />
        </div>
        <div key="card2" className="drag-handle">
          <ExpandableCard id="card2" />
        </div>
        <div key="card3" className="drag-handle">
          <ExpandableCard id="card3" />
        </div>
      </GridLayout>
    </Box>
  );
};

export default CustomizableCardGrid;
