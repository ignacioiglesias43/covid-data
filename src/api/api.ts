import axios from "axios";
import { MainData } from "../interfaces/mainData";

export const getMainData = () =>
  axios.get<MainData>(
    "https://api.apify.com/v2/key-value-stores/vpfkeiYLXPIDIea2T/records/LATEST?disableRedirect=true"
  );
