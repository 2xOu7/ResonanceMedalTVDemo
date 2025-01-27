import {
  logMicrocopyConfirmation,
  logMicrocopyImpression,
  MicrocopyContext,
} from 'resonance-client'
import { Component } from 'react'
import { Alert, Box, Button, Typography } from '@mui/material'

export default class SimpleBanner extends Component<{}, {}> {
  render() {
    return (
      <MicrocopyContext.Consumer>
        {({ copies }) => {
          const copiesToFilter = copies.filter(
            (c) => c.format === 'Embedded Home Page Banner'
          )

          if (copiesToFilter.length <= 0) {
            return null
          }

          const copy = copiesToFilter[0]
          logMicrocopyImpression(
            copy.campaignId,
            copy.variant.variantId,
            copy.variant.variantName
          )

          return (
            <Box style={{ marginLeft: '20vw', marginRight: '20vw' }}>
              <Alert severity={'info'}>
                <Typography variant={'body1'}>
                  {copy.variant.content['description']}
                </Typography>
                <Button
                  onClick={() => {
                    logMicrocopyConfirmation(
                      copy.campaignId,
                      copy.variant.variantId,
                      copy.variant.variantName
                    )
                  }}
                >
                  {copy.variant.content['button_text']}
                </Button>
              </Alert>
            </Box>
          )
        }}
      </MicrocopyContext.Consumer>
    )
  }
}
