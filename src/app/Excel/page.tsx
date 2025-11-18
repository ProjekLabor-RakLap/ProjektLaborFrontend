import PillNavFull from '../../Components/NavBar/PillNav/PillNavWithItems';
import {
  Box,
  Container,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { ITables } from '../../Interfaces/ITables';

function Excel() {

  const [selectedTable, setSelectedTable] = useState<ITables>(ITables.Products);

  const handleTableChange = (event: SelectChangeEvent<number>) => {
    setSelectedTable(Number(event.target.value) as ITables);
  };

  const downloadExcel = async (table: number): Promise<void> => {
    try {
      const response = await fetch("https://localhost:7116/api/excel/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(table)
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Failed to export file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${ITables[table]}_Export.xlsx`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Excel export failed:", error);
    }
  };

  const importExcel = async (table: ITables, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `https://localhost:7116/api/excel/import?table=${table}`,
      {
        method: "POST",
        body: formData
      }
    );

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg);
    }

    console.log("Imported successfully");
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await importExcel(selectedTable, file);
      console.log("Import successful");
    } catch (err) {
      console.error("Import failed:", err);
    }
  };

  const downloadTemplate = async (table: ITables): Promise<void> => {
  try {
    const response = await fetch(
      `https://localhost:7116/api/excel/template?table=${table}`,
      {
        method: "GET"
      }
    );

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg || "Failed to download template");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${ITables[table]}_Template.xlsx`;
    a.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Template download failed:", error);
  }
};


  return (
    <div className="App">
      <header className="App-header">
        <PillNavFull />

        <Box mb={8} display="flex" flexDirection="column" alignItems="center" gap={2} sx={{ marginTop: "5rem" }}>
          <Container maxWidth="md">
            <Box textAlign="center" mb={8}>
              <div style={{display: 'flex', justifyContent: 'center'}}>
              <FormControl sx={{ minWidth: 220, mr: 2 }}>
                <Select
                  value={selectedTable}
                  label="Select Table"
                  onChange={handleTableChange}
                  sx={{
                    width: 300,
                    bgcolor: "white",
                    color: "black",
                    borderRadius: 1,
                    marginBottom: "20px",
                    }}
                >
                  {Object.entries(ITables)
                    .filter(([key, value]) => !isNaN(Number(value)))
                    .map(([key, value]) => (
                      <MenuItem key={value} value={value}>
                        {key}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', marginTop: '16px'}}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ borderRadius: 3, px: 4, py: 1.5, ml: 2, width: 300 }}
                onClick={() => downloadExcel(selectedTable)}
              >
                Export Excel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ borderRadius: 3, px: 4, py: 1.5, ml: 2, width: 300 }}
                onClick={() => document.getElementById("excel-upload")?.click()}
              >
                Import Excel
              </Button>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', marginTop: '16px'}}>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                sx={{ borderRadius: 3, px: 4, py: 1.5, ml: 2, width: 300 }}
                onClick={() => downloadTemplate(selectedTable)}
                >
                Download Template
               </Button>
                </div>

              <input
                type="file"
                accept=".xlsx"
                id="excel-upload"
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />

            </Box>
          </Container>
        </Box>
      </header>
    </div>
  );
}

export default Excel;
