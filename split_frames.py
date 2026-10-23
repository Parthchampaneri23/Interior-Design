import cv2
import os

def extract_frames(video_path, output_dir, target_frames=200):
    if not os.path.exists(video_path):
        print(f"Error: Video file {video_path} not found.")
        return

    os.makedirs(output_dir, exist_ok=True)

    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    print(f"Video Info: Total frames = {total_frames}, FPS = {fps}")

    if total_frames <= 0:
        print("Error: Could not read video frames.")
        return

    # Calculate step size to get evenly spaced target_frames (200 frames)
    step = max(1, total_frames / target_frames)
    frame_indices = [int(i * step) for i in range(target_frames)]
    frame_indices = [min(idx, total_frames - 1) for idx in frame_indices]

    saved_count = 0
    current_idx = 0

    target_set = set(frame_indices)
    target_sorted = sorted(list(target_set))
    target_pos = 0

    while cap.isOpened() and target_pos < len(target_sorted):
        ret, frame = cap.read()
        if not ret:
            break

        if current_idx == target_sorted[target_pos]:
            output_filename = os.path.join(output_dir, f"frame_{saved_count + 1:04d}.jpg")
            cv2.imwrite(output_filename, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
            saved_count += 1
            target_pos += 1

        current_idx += 1

    cap.release()
    print(f"Successfully extracted and saved {saved_count} frames to '{output_dir}'.")

if __name__ == "__main__":
    video_file = os.path.join("public", "hero1.mp4")
    output_folder = os.path.join("public", "frames")
    extract_frames(video_file, output_folder, target_frames=240)
