import React from 'react'
import { Grid, IconButton, Tooltip } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from '../../redux/store'

export const TableFunctions = (props: any) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  if (!props.tableProps._id) return null

  return (
    <Grid container justifyContent="space-evenly" alignItems="center">
      <Grid
        item
        xs={4}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Tooltip title="Üzerinde Çalışılıyor">
          <IconButton
            color="info"
            aria-label="Üzerinde Çalışılıyor"
            disabled
            onClick={() => {
              navigate(encodeURI('/sistem-ayarlari'), {
                state: {
                  semesterID: props.tableProps._id,
                },
              })
            }}
            size="large"
          >
            <OpenInNewIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  )
}
