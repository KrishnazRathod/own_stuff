/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ExpandableCard from "../NoteCard";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getNotes } from "../../redux/NotesSlice";

const CustomizableCardGrid = () => {
  const notes = useSelector(getNotes);

  const [layout, setLayout] = useState(
    notes.map((note: any, index: any) => ({
      i: note._id,
      x: (index % 3) * 3,
      y: Math.floor(index / 3),
      w: 3,
      h: 2, // Default height
    }))
  );

  useEffect(() => {
    const layoutFromate = notes.map((note: any, index: any) => ({
      i: note._id,
      x: (index % 3) * 3,
      y: Math.floor(index / 3),
      w: 3,
      h: 2, // Default height
    }));
    setLayout(layoutFromate);
  }, [notes]);

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };

  // Function to update the card height dynamically
  const updateCardHeight = (id: string, height: number) => {
    const updatedLayout = layout.map((item: any) => {
      if (item.i === id) {
        return { ...item, h: Math.ceil(height / 100 + 1) }; // Adjust height based on rowHeight
      }
      return item;
    });
    setLayout(updatedLayout);
  };

  return (
    <Box maxW="100%" mx="auto" px={12} py={6}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={1200}
        onLayoutChange={onLayoutChange}
        draggableHandle=".drag-handle" // Only drag with handle
      >
        {notes.map((note: any) => (
          <div key={note._id}>
            <ExpandableCard
              noteData={note}
              onHeightChange={(height: number) =>
                updateCardHeight(note._id, height)
              } // Callback to update height
            />
          </div>
        ))}
      </GridLayout>
    </Box>
  );
};

export default CustomizableCardGrid;
