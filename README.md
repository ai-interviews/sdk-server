## AI interview bot

Early phase (still in development) of JavaScript interview browser SDK to run AI-powered interviews

## Environment Setup

Local testing instructions. Make sure you have [node](https://nodejs.org/en/download) installed on your machine first and have the repo cloned.

**Run the server**

1. Run `npm install`
2. Run `npm run dev`

## Directory structure

#### `server` directory

Express server that handles incoming socket connection from SDK and all conversational logic. To be deployed.

- `index.ts` is the main entry point
- `openai.ts` initializes the chat SDK and provides a helper
- `speech.ts` initializes the Azure Speech SDK and provides helpers

## Process diagram

<img src="https://www.plantuml.com/plantuml/png/VP31Rk8m48RlynIZx3ah8M0FQ3TYsueUUga4FPKU9lP4M2Hsv8nLGDpx5EsXZzOdAII10eNwvF7_VRyq7bP2NaAH0sJE2NkC_bPcnODEF_buUSTsw2N_TjTkCXRFLB16JK9eBAfPiFDgQh_CjzVp9bkDbEUDIOBEAiRwJ6q484Ponl7D7OvozupNC_82G4gSnuUAFLA512LvCSgKP0MZaNTMaAsEjc5w75wHckyp1Mp5o1AZ_wlWUMh79REQnUBY2I-aPlIUkRsVr2zyQctPhTFODPC11N4s52bxx01X_FZBitwAamHJ761X51fR1e4KupX1XODcnjHOyakae8q3MA_NS5ZL_Tq1LHlwlA5FweGNyhscrzGao1lma6HiRHVaijxVwTa9cM5yxF-ypPzsb_I2a1v-6ssWgcIQiwzQ6ePiTIZoJm00" width="480">
