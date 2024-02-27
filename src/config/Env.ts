let environment = "testing"

const Env = {
    "BaseBack": environment === "production" ? "https:/cuicode_systems_vm:3000" : "http://localhost:3000",
    "SystemKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTeXN0ZW1LZXkiOiJjdWlfY29kZV9zeXN0ZW1zX2FkbWluX2tleSIsImlhdCI6MTcwODcwMjY5MX0.P2vkcmnZ0924mHYVLlqL8Aduvze8Y_gXi3_yUwTGQRs",
}

export default Env