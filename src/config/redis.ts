// import Redis from "ioredis";

// export const redis = new Redis({
//     host : "127.0.0.1",
//     port : 6379
// });


import Redis from "ioredis";

let redis: Redis | null = null;

if (process.env.NODE_ENV === "production") {
  redis = new Redis({
    host: "127.0.0.1",
    port: 6379,
  });

  redis.on("error", (err) => {
    console.error("Redis error:", err.message);
  });
}

export { redis };
