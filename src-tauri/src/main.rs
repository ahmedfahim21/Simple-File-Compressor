// Prevents additional console window on Windows in release, DO NOT REMOVE!!

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
extern crate flate2;
use flate2::write::GzEncoder;
use flate2::Compression;

use std::fs::File;
use std::io::copy;
use std::io::BufReader;
use std::time::Instant;

#[tauri::command]
fn compress(path1: &str, path2: &str) -> String {
    
    let mut input = BufReader::new(File::open(path1).unwrap());
    let output = File::create(path2).unwrap();

    let mut encoder = GzEncoder::new(output, Compression::default());
    let _start = Instant::now();
    copy(&mut input, &mut encoder).unwrap();
    let output = encoder.finish().unwrap();

    format!("Source len: {:?}", input.get_ref().metadata().unwrap().len());
    format!("Target len: {:?}", output.metadata().unwrap().len());
    format!("Successfully compressed the file")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![compress])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
