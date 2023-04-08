<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResumeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'personal_info' => json_decode($this->personal_info),
            'social_links' => json_decode($this->social_links),
            'education' => json_decode($this->education),
            'experiences' => json_decode($this->experiences),
            'skills' => json_decode($this->skills),
            'languages' => json_decode($this->languages),
            'projects' => json_decode($this->projects),
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d'),
            'updated_at' => Carbon::parse($this->updated_at)->format('Y-m-d'),
        ];
    }
}
