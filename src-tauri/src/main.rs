#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::fs::File;
use std::path::PathBuf;
use std::sync::Mutex;
use directories::ProjectDirs;
use serde::{Deserialize, Serialize};
use tauri::State;

#[tauri::command]
fn set_token(value: &str, state: State<AppState>) {
    let mut token = state.token.lock().unwrap();

    *token = value.to_string();
    drop(token);

    println!("AppState has been updated with token: {value}");
    state.save();
    println!("Save complete.");
}


#[tauri::command]
fn get_token(state: State<AppState>) -> String {
    state.token.lock().unwrap().clone()
}

#[derive(Serialize)]
struct AppState {
    token: Mutex<String>
}

#[derive(Deserialize)]
struct AppStateSingleThreaded {
    token: String
}

impl AppState {
    fn load() -> AppState {
        if let Some(proj_dirs) = ProjectDirs::from("au", "popplestones", "todo") {
            let config_dir = proj_dirs.config_dir();
            let file_path = config_dir.join("app_state.json");

            if let Ok(file) = File::open(&file_path) {
                let temp_state: AppStateSingleThreaded = serde_json::from_reader(file).expect("Cannot open file");
                return AppState {
                    token: Mutex::new(temp_state.token),
                };
            }
        }
        AppState { token: Mutex::new("".to_string()) }
    }

    fn save(&self) {
        if let Some(proj_dirs) = ProjectDirs::from("au", "popplestones", "todo") {
            let config_dir = proj_dirs.config_dir();

            fs::create_dir_all(config_dir).unwrap();

            let file_path = config_dir.join("app_state.json");
            write_to_file(&file_path, &self).unwrap();
        }

    }
}

fn write_to_file(file_path: &PathBuf, app_state: &AppState) -> serde_json::Result<()> {
    let file = File::create(file_path).unwrap();
    serde_json::to_writer_pretty(file, app_state).unwrap();
    Ok(())
}

fn main() {
    let state = AppState::load();
    println!("State: {}", state.token.lock().unwrap());

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![get_token, set_token])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
