package main

import (
	"testing"

	"github.com/go-chi/chi/v5"
	"github.com/rafalq/golang-hotel-app/internal/config"
)

func TestRoutes(t *testing.T) {
	var app config.AppConfig

	r := routes(&app)

	switch v := r.(type) {
	case *chi.Mux:
		// do nothing; test passed
	default:
		t.Errorf("type is not *chi.Mux, type is %T", v)
	}
}
