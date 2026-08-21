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

type ServiceConfig struct {
	Enabled      bool `json:"enabled"`
	ResponseTime int  `json:"response_time"` // ms delay
}

type Config struct {
	Running  bool                      `json:"running"`
	Rate     int                       `json:"rate"` // ms between generation
	Services map[string]*ServiceConfig `json:"services"`
}

var (
	config = Config{
		Running: false,
		Rate:    1000,
		Services: map[string]*ServiceConfig{
			"nginx":    {Enabled: true, ResponseTime: 0},
			"kafka":    {Enabled: true, ResponseTime: 0},
			"digital":  {Enabled: true, ResponseTime: 0},
			"core":     {Enabled: true, ResponseTime: 0},
			"atm":      {Enabled: true, ResponseTime: 0},
			"postgres": {Enabled: true, ResponseTime: 0},
		},
	}
	mu sync.Mutex
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
		services := config.Services
		mu.Unlock()

		if running {
			for name, svc := range services {
				if svc.Enabled {
					if svc.ResponseTime > 0 {
						time.Sleep(time.Duration(svc.ResponseTime) * time.Millisecond)
					}
					logData("logs.txt", fmt.Sprintf("INFO: Generating data for %s service...", name))
					logData("metrics.txt", fmt.Sprintf("metric: %s_request_count value:%d", name, rand.Intn(100)))
					logData("traces.txt", fmt.Sprintf("TRACE: service=%s span_id=%d", name, rand.Intn(100000)))
				}
			}
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
