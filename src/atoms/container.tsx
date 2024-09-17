import { Box, BoxProps } from '@kuma-ui/core'

interface Props extends BoxProps {}

export const Container: React.FC<Props> = ({
  children,
  ...boxProps
}: Props) => {
  return (
    <Box
      maxWidth="100%"
      width={['auto', 'auto', 'auto', '723px', '933px', '1127px']}
      marginLeft={['0', '1em', 'auto']}
      marginRight={['0', '1em', 'auto']}
      {...boxProps}
    >
      {children}
    </Box>
  )
}
