export default function({ $axios }) {
  $axios.onRequest((config) => {
    config.timeout = 2
  })
}
