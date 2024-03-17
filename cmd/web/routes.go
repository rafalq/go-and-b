package main

import (
	"net/http"

	"github.com/go-chi/chi/v5/middleware"
	"github.com/rafalq/golang-hotel-app/internal/config"
	"github.com/rafalq/golang-hotel-app/internal/handlers"

	"github.com/go-chi/chi/v5"
	// "github.com/gotailwindcss/tailwind/twembed"
	// "github.com/gotailwindcss/tailwind/twhandler"
)

func routes(app *config.AppConfig) http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.Recoverer)
	r.Use(NoSurf)
	r.Use(SessionLoad)

	r.Get("/", handlers.Repo.Home)
	r.Get("/about", handlers.Repo.About)
	r.Get("/contact", handlers.Repo.Contact)
	r.Get("/choose-room/{id}", handlers.Repo.ChooseRoom)
	r.Get("/reserve-room", handlers.Repo.ReserveRoom)
	r.Get("/reservation", handlers.Repo.Reservation)
	r.Get("/reservation-summary", handlers.Repo.ReservationSummary)
	r.Get("/rooms", handlers.Repo.Rooms)
	r.Get("/user/login", handlers.Repo.Login)

	r.Post("/reservation", handlers.Repo.PostReservation)
	r.Post("/search-availability", handlers.Repo.PostAvailability)
	r.Post("/search-availability-json", handlers.Repo.AvailabilityJSON)
	r.Post("/user/login", handlers.Repo.PostLogin)

	fileServer := http.FileServer(http.Dir("./static/"))
	r.Handle("/static/", http.StripPrefix("/static/", fileServer))

	// tailwindcss wrapper
	// r.Handle("/static/css/*", http.StripPrefix("/static/css", twhandler.New(http.Dir("static/css"), "/static/css", twembed.New())))

	return r
}
