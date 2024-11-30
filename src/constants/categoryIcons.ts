import { IconType } from "react-icons";
import {
    FaUtensils,
    FaShoppingCart,
    FaHome,
    FaBus,
    FaCar,
    FaGamepad,
    FaMobile,
    FaPiggyBank,
    FaChartLine,
    FaMoneyBillWave,
    FaQuestion,
    FaWallet
} from "react-icons/fa";

export const categoryIcons: { [key: string]: IconType } = {
    FOOD_DRINKS: FaUtensils,
    SHOPPING: FaShoppingCart,
    HOUSING: FaHome,
    TRANSPORTATION: FaBus,
    VEHICLE: FaCar,
    LIFE_ENTERTAINMENT: FaGamepad,
    COMMUNICATION: FaMobile,
    FINANCIAL: FaPiggyBank,
    INVESTMENTS: FaChartLine,
    INCOME: FaMoneyBillWave,
    OTHER: FaQuestion,
    DEFAULT: FaWallet
};
