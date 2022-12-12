import { Button, Card,IconButton, Box,FormControl,Typography} from "@mui/material";

import { styled, useTheme } from "@mui/material/styles";
export const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: "128px",
  boxShadow: `0 4px 6px 0 rgb(16 25 40 / 10%)`,
  textTransform: "capitalize",
  paddingLeft: "25px",
  paddingRight: "25px",
  fontWeight: 700,
  paddingTop: "10px",
  paddingBottom: "10px",
  borderRadius: "0px",
  fontFamily: "Mulish",
  fontStyle: "normal",
  backgroundColor: "black",
  color: "#fff",
  lineHeight: "30px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "17px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "17px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "17px",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "17px",
  },
  "&:hover": {
    backgroundColor: "#5d5d5d",
  },
}));





export const MainBox = styled("div")(() => ({
  backgroundColor: "#f7f7f8",
  width: "100%",
}));

export const StyledCard = styled(Card)(()=>({
  margin :'0 1rem'
}))

export const StyledModalHeading=styled('h3')(()=>({
  color: "#000",
  width: "100%",
  margin: "0 auto",
  padding: "1rem 0rem",
  fontSize: "24px",
  textAlign: "center",
  borderBottom: " 1px solid lightgray",
}));

export const ModalCloseButton = styled(IconButton)(()=>({
  right: "14px", position: "absolute"
}))
export const ModalHeadContainer = styled(Box)(()=>({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))
export const ModalFooterContainer = styled(Box)(()=>({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '1rem 0rem',
  color: 'black',
  fontSize: '18px',
  borderTop: '1px solid lightgray',
  width: '100%',
  textAlign: 'center',
 
}));
export const FormLabel=styled('span')(()=>({
  fontFamily: 'Mulish',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: '23px',
  color: '#666666',
  display:'block'
}))
export const StyledFormControl = styled(FormControl)(()=>({
  width:'100%'
}))
export const StyledTypography = styled(Typography)(()=>({

    padding: '0.125rem 0.25rem',
    border: '1px solid #495B6D',
    borderRadius: '2px',

}))