package main

import (
	"fmt"
	"log"
	"math/rand"
	"os"
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
)

type Config struct {
	Running bool  `json:"running"`
	Rate    int   `json:"rate"` // ms between generation
}

var (
	config = Config{Running: false, Rate: 1000}
	mu     sync.Mutex
)

func main() {
	app := fiber.New()

	app.Post("/config", func(c *fiber.Ctx) error {
		mu.Lock()
		defer mu.Unlock()
		if err := c.BodyParser(&config); err != nil {
			return err
		}
		return c.JSON(config)
	})

	app.Get("/status", func(c *fiber.Ctx) error {
		mu.Lock()
		defer mu.Unlock()
		return c.JSON(config)
	})

	go generateData()

	log.Fatal(app.Listen(":3000"))
}

func generateData() {
	for {
		mu.Lock()
		running := config.Running
		rate := config.Rate
		mu.Unlock()

		if running {
			logData("logs.txt", "INFO: Generating data for microservices...")
			logData("metrics.txt", fmt.Sprintf("metric: request_count value:%d", rand.Intn(100)))
			logData("traces.txt", "TRACE: span_id=123 trace_id=456")
		}

		time.Sleep(time.Duration(rate) * time.Millisecond)
	}
}

func logData(filename, content string) {
	f, err := os.OpenFile("/data/"+filename, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Println("Error opening file:", err)
		return
	}
	defer f.Close()
	if _, err := f.WriteString(time.Now().Format(time.RFC3339) + " " + content + "\n"); err != nil {
		log.Println("Error writing to file:", err)
	}
}
