import { useColorScheme, } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Box from '@mui/material/Box';

function ModeSelect() {
  const { mode, setMode } = useColorScheme();
  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <FormControl sx={
      {
        m: 1,
        minWidth: 120
      }
    } size="small">
      <InputLabel
        id="label-select-dark-light-mode"
        sx={
          {
            color: 'white',
            '&.Mui-focused': { color: 'white' },
          }
        }
      >
        Mode
      </InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Age"
        onChange={handleChange}
        sx={
          {
            color: 'white',
            '.MuiOutlinedInput-notchedOutline' : { borderColor: 'white' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
            '.MuiSvgIcon-root': { color: 'white' },
          }
        }
      >
        <MenuItem value={'light'}>
          <div style={
            {
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }
          }>
            <LightModeIcon fontSize='small'/> Light
          </div>
        </MenuItem>
        <MenuItem value={'dark'}>
          <Box sx={
            {
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }
          }>
            <NightsStayIcon fontSize='small' /> Dark
          </Box>
        </MenuItem>
        <MenuItem value={'system'}>
          <Box sx={
            {
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }
          }>
            <SettingsBrightnessIcon fontSize='small' /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default ModeSelect;