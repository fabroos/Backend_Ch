const user = 'coderhouse'
const password = 'coderhouse'

const uri = `mongodb+srv://${user}:${password}@cluster0.fkfefba.mongodb.net/ecommerce?retryWrites=true&w=majority`
export default {
  fileSystem: {
    path: './DB'
  },
  mongodb: {
    cnxStr: uri,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    }
  },
  firebase: {
    type: 'service_account',
    project_id: 'coderhousebackend-3c2c8',
    private_key_id: '243d5c533053b16ccadb5721d6621f7b54d83e3c',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCaqcA8uK0UCq1t\nUdH5rgXkSjtwPIJwar7KtMCiXQpyXzLDKhmvrL788DaqcJZkIyVqxv/lyXrsg5cB\n89MmTZFldDNEnUDoXV2cKMlBPhq6U850A3CaMA01m0yLffGf5jeSxuV+0Iir9rWm\n+bpq2/m83RD+c0SZmxncdZ9FItsQnw4X8liTacULsJd+NoTVb9KBB69G3pdQE1UT\nxooc7Vp+QvLYEIzxz/nN1UP8v/49MK2vhstN6JdpIHDgs2n9+Zmp5dYLuH7ZR4D3\neCHxhxFurj/znnk+91ygE5Zl2MKbRI+cYf3k9cSnxQxZvcXCw59PmXxFcjG9V7Yp\nBrceDeJvAgMBAAECggEAR9qokK1d38tMIldafazPWO3x6mV6Vl8Jb+SFAInIUjWP\nQGO9VkQj4SB6zTmMbU500kRM3AV8oghKrmIIjamI7MENFooWfz3tQSEjyzdetIU+\nC+ETPdcoM+kIKWBkUtziocLdGUspy/bNExu/c2jqgEeWXxjPXKvV2noc+kJE01XQ\n/WYaGVYc5WRi1xtDY23L0AEFVPjeJxTNS4K68W4YfZKiWpFWAlM2NNLJ4HqZsinQ\nftVkQrQwX/uBg1vrTaSIgL/e1L+0ILLK7iO1E//K6SuHI4Zgz7sxn6jyT5VwpUdz\nsydc9TSfX/LpCyh+bZyJfXwgGj4Jji5+uD5UeD/EtQKBgQDNEb/09238sNG3p7yd\nX8zm3rQoqllfaANlbSklA46D+i3mWAAOcb18Ha6DGz6MMmV7fHANdAqPoIcOyVHW\nDGHnsPF63OWQrRBaRsU0Qemv05qsBClSb1dF3z9imGP6Gk0S1TPcptzjP5hxngaT\nZSv0B05yFPldEEH4p2j1ic/QfQKBgQDBEy+wr2iB9JgnR6iRb7/TJ/ef3myVB16X\n3Yj9Qo99s6P61E5SM6rq9QIPQuyU9UCoVFwisvBnvd8kyC3eLCeyQ65RTGPc4wmu\nF4SnVuVB0NU/VaFmToNrSrbEOIqe7/nDDgIImkOaycq8gd1Y0GlHDSwBZVGa92+J\nobV14tq+WwKBgBYQIdHuSQQV1gpnXpCj/Pyd205AvarZGvxvmSylTFEAuq18rEzh\nidxvqRXr+XfF+Esn4TphUL2RLNa3bDmWTXZLAEASwhQluour742mxcioAI0fSX7Y\nAdC/qycldCQ1bjNngtPrk/pTHkijEtwK14bCvnrhrM6JcD+ba1x3fkdVAoGBAIOh\nGPpUG+O9ZZ4h9IJytUy4CtIrScuwYoUWu7YuErWYK0tuQpc4MmZM80KEVdaX/aTF\nHqtpYwzXHbJt5xd48vdNvSIf+lU1U/wkfIO5ckMUpM2xC4A8NsyG+2N7SMZixNx+\nSFSlF0IIIPezcbyDGcMe78lj0ebcmmYyoQvlxUvRAoGBAK9B+noOn3H3Aw4jqGzP\n2p6Xdw9m3+3O7qxbCVk3XQuYKvKgWyBGNifSYWiOYdoZrbN3Ps+kJBg2ql+58Xi9\nPkBDr57vw63AJNjVq527CbPET5wB+LRXBLnaCSW97r3ALB0gUmGG2+EmAJzLje6U\nlW0BDaywPWkBXTCsD8caIJI1\n-----END PRIVATE KEY-----\n',
    client_email:
      'firebase-adminsdk-x3svk@coderhousebackend-3c2c8.iam.gserviceaccount.com',
    client_id: '105951237259218206787',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x3svk%40coderhousebackend-3c2c8.iam.gserviceaccount.com'
  },
  MODO_PERSISTENCIA: 'firebase'
}
